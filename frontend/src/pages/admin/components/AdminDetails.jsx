import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfileDetails } from "../../../redux/user/actions/userActions";
const AdminDetails = () => {
  const dispatch = useDispatch();
  const [adminDetails, setAdminDetails] = useState({});

  useEffect(() => {
    dispatch(fetchProfileDetails()).then((profile) => {
      setAdminDetails(profile.profile);
    });
  }, []);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-[Fahkwang] font-medium text-gray-900">
          Admin Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm font-[Montserrat] text-gray-500">
          Personal details
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 font-[Montserrat] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {adminDetails?.firstName}{" "}{adminDetails?.lastName}
            </dd>
          </div>
          <div className="bg-white font-[Montserrat] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {adminDetails?.email}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default AdminDetails;
