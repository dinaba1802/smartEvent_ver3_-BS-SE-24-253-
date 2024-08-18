import React, { useEffect, useMemo, useState } from "react";
import { getAllBusinesses } from "../services/business.service";
import BusinessCard from "../components/BusinessCard";
import "react-calendar/dist/Calendar.css";
const AllBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [businessesCache, setBusinessesCache] = useState([]);

  const [showingTypes, setShowingTypes] = useState(new Map());
  const types = useMemo(
    () =>
      Array.from(
        new Set(businessesCache.map((b) => b.businessInformation.businessType))
      ),
    [businessesCache]
  );

  const chooseType = (type, checked) => {
    showingTypes.set(type, checked);
    setShowingTypes(new Map(showingTypes.entries()));
  };
  useEffect(() => {
    const fetchBusinesses = async () => {
      const result = await getAllBusinesses();
      setBusinesses(result.filter((b) => b.businessInformation));
      setShowingTypes(
        new Map(
          result
            .map((b) => b.businessInformation.businessType)
            .map((t) => [t, true])
        )
      );
      setBusinessesCache(result.filter((b) => b.businessInformation));
    };
    fetchBusinesses();
  }, []);
  const search = (q) => {
    if (!q) {
      setBusinesses(businessesCache);
      return;
    }
    setBusinesses(
      businessesCache.filter((b) =>
        b.businessInformation.businessName
          .toLowerCase()
          .includes(q.toLowerCase())
      )
    );
  };

  console.log(showingTypes);

  return (
    <div>
      <h1 className="ml-4 text-[32px]">All Businesses</h1>

      <input
        placeholder="Search business by name.."
        className="p-3 bg-[lightgray] placeholder:text-black mx-auto ml-8 my-4"
        onChange={(e) => search(e.target.value)}
      />
      <div
        style={{
          display: "grid",
          maxWidth: "fit-content",
          padding: "1rem",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {React.Children.toArray(
          types.map((t) => (
            <div className="p-2 flex flex-row items-center gap-2">
              <label className="text-[20px]">{t}</label>
              <input
                className="p-2 h-[20px] w-[20px]"
                type="checkbox"
                checked={showingTypes.get(t)}
                onChange={(e) => {
                  chooseType(t, e.target.checked);
                }}
              ></input>
            </div>
          ))
        )}
      </div>
      <div className="m-4">
        {React.Children.toArray(
          businesses
            .filter((b) => showingTypes.get(b.businessInformation.businessType))
            .map((b) => (
              <BusinessCard
                businessId={b._id}
                customerView
                businessInfo={b.businessInformation}
              />
            ))
        )}
      </div>
    </div>
  );
};
export default AllBusinesses;
