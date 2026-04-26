import { useState } from "react"

export const QRCode = () => {
    const [img, setImg] = useState("public/images/sample.png")
    const [loading, setLoading] = useState(false)
    const [qrData, setQRData] = useState("")
    const [qrSize, setQRSize] = useState("")

    async function generateQR() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
            setImg(url);
        } catch (error) {
            console.log("Error Generating QR Code", error);
        } finally {
            setLoading(false);
        }
    }

    function DownloadQR(){
        fetch(img)
        .then((Response)=>Response.blob())
        .then((blob)=>{
         const link=document.createElement("a");
         link.href=URL.createObjectURL(blob);
         link.download="qrcode.png";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);   
        })
        .catch((error)=>{
            console.log("Error downloading QR code", error);
        })
        
        
    }

    return (
        <div className="app-container">
            <h2>QR CODE GENERATOR</h2>
            {loading && <p>Please wait...</p>}
            {img && <img src={img} alt="QR Code" />}
            <div className="input-container">
                <label htmlFor="dataInput" className="input-label">Data for QR code : </label>
                <input type="text" id="dataInput" placeholder="Enter data for QR code" value={qrData} onChange={(e) => setQRData(e.target.value)} />
            </div>
            <div className="input-container">
                <label htmlFor="dataInput" className="input-label">Image size(eg:- 150) : </label>
                <input type="text" id="sizeInput" placeholder="Enter image size" value={qrSize} onChange={(e) => setQRSize(e.target.value)} />
            </div>
            <div className="btn-container">
                <button id="generateQR" className="btn" onClick={generateQR} disabled={loading}>Generate QR Code</button>
                <button id="downloadQR" className="btn" onClick={DownloadQR}>Download QR Code</button>
            </div>
            <div className="footer"><p>Designed by Danu</p></div>
        </div>
    )
}
