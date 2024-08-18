import { useNavigate } from "react-router-dom";

const BusinessCard = ({ businessId, businessInfo, customerView }) => {
  const nav = useNavigate();
  return (
    <div
      className="p-[2rem] m-4 flex flex-col items-start gap-4 bg-[white] rounded-lg max-w-[750px]"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <img
        className="rounded-full my-3 w-[150px] h-[150px] border-[1px] border-[lightgray]"
        src={
          businessInfo.businessImages.length > 0
            ? businessInfo.businessImages[0]
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s"
        }
      />
      <div>
        <span>Business Name: </span>
        <b>{businessInfo.businessName}</b>
      </div>
      <div>
        <span>Business Type: </span>
        <b>{businessInfo.businessType}</b>
      </div>
      <div>
        <span>Business Location: </span>
        <b>{businessInfo.businessAddress}</b>
      </div>
      <div>
        <span>Business Phone: </span>
        <b>{businessInfo.businessPhone}</b>
      </div>
      <div>
        <span>Business Email: </span>
        <b>{businessInfo.businessEmail}</b>
      </div>
      <div>
        <span>Business About: </span>
        <b>{businessInfo.businessAbout}</b>
      </div>

      {customerView && (
        <div
          className="self-end text-white p-3 font-bold rounded-md"
          style={{ backgroundColor: "rgb(29, 160, 172)" }}
        >
          <button
            onClick={() => {
              nav(`/dashboard/business/${businessId}`);
            }}
          >
            Schedule events
          </button>
        </div>
      )}
    </div>
  );
};
export default BusinessCard;
