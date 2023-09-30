import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import baseUrl from "../../api/baseURL";

const AddCategoryModal = () => {
  let [name, setName] = useState("");

  //   useEffect(()=>{

  //   },[])

  const onSubmit = (e) => {
    e.preventDefault();
    baseUrl
      .post("api/Category", {
        name,
      })
      .then((res) => console.log(res));
    console.log(name);
  };

  return (
    <>
      <Modal
        title="أضف تصنيف"
        label="أضف تصنيف"
        labelClass="py-2 px-4 bg-slate-950 text-white font-semibold rounded-lg  hover:bg-gray-900   focus:ring-opacity-75"
        uncontrol
        footerContent={
          <Button text="أضافة" className="btn-dark " onClick={onSubmit} />
        }
      >
        <form action="">
          <div className="text-base text-slate-600 dark:text-slate-300">
            <Textinput
              label="اسم التصنيف"
              type="text"
              placeholder="ادخل اسم التصنيف"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
