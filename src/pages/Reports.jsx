import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import NewPDFReport from "./reports/NewPDFReport";
import { OrderService } from "../services/order.service";
import { PDFDownloadLink } from "@react-pdf/renderer";
const Reports = () => {
  const ordService = new OrderService();
  const [totalSales, setTotalSales] = useState();
  const [initial, setInitial] = useState()
  const [final, setFinal] = useState()
  const [show, setshow] = useState(false);
  const showDocument = () => {
    setshow(true);
  };
  useEffect(() => {
    const getOrders = () => {
      ordService.filterDates().then((res) => {
        const completed = res.orders?.map((order)=>order).filter(order=>order.status !== 0);
        setTotalSales(completed)
      });
    };
    getOrders();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <div className="p-10">
        <div className="w-full">
          <label className="font-semibold">Fecha de inicio:</label>
          <input className="border rounded ml-2 px-4" type="date" onChange={(e)=>setInitial(e.currentTarget.value)} />
          <label className="font-semibold ml-8">Fecha de fin:</label>
          <input className="border rounded ml-2 px-4" type="date" onChange={(e)=>setFinal(e.currentTarget.value)} />
          {!show && (
            <button
              onClick={showDocument}
              className="bg-green-500 text-white ml-10 px-8 rounded py-1 font-semibold"
            >
              Generar
            </button>
          )}
        </div>
        {show && (
          <>
            <NewPDFReport show={show} sales={totalSales} initial={initial} final={final} />
           <div className="mt-8">
           <PDFDownloadLink
          document={<NewPDFReport show={show} sales={totalSales} initial={initial} final={final} />}
          fileName={`Report-${Date.now()}.pdf`}
          style={{
            textDecoration: "none",
            padding: "10px",
            fontWeight:500,
            borderRadius:10,
            color: "#fff",
            backgroundColor: "#00b9ae",
          }}
        >
          {() =>
           "Descargar Pdf"
          }
        </PDFDownloadLink>
           </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Reports;
