import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import baseUrl from "../../api/baseURL";
import axios from "axios";

const EditCategoryModal = ({ show, setShow, idEdit, nameEdit, getAllData }) => {
  let [name, setName] = useState("");
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    baseUrl
      .put("api/Category", {
        id: idEdit,
        name,
      })
      .then((res) => {
        setActiveModal(false);
        setShow(false);
        getAllData();
      })
      .catch((e) => {})
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Modal
        activeModal={show}
        title="تعديل تصنيف"
        onClose={() => {
          setActiveModal(false);
          setShow(false);
        }}
        footerContent={
          <Button
            text="تعديل"
            isLoading={isLoading}
            className="btn-dark py-2 px-4 bg-slate-950"
            onClick={onSubmit}
          />
        }
      >
        <form action="">
          <div className="text-base text-slate-600 dark:text-slate-300">
            <Textinput
              label="اسم التصنيف"
              type="text"
              placeholder="ادخل اسم التصنيف"
              defaultValue={nameEdit}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditCategoryModal;
