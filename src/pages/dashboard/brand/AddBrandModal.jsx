import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import baseUrl from "../../../api/baseURL";
import { toast } from "react-toastify";

const AddBrandModal = ({ getAllData }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup
    .object({
      name: yup.string().required("يرجى إدخال اسم الماركة"),
    })
    .required();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    baseUrl
      .post("api/Brand", {
        name: data.name,
      })
      .then((res) => {
        setActiveModal(false);
        getAllData();
        reset();
        toast.success("تم إضافة الماركة", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          // theme: "dark",
        });
      })
      .catch((e) => {})
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Button
        text="أضف الماركة"
        className="py-2 px-4 bg-slate-950 text-white font-semibold rounded-lg hover:bg-gray-900 focus:ring-opacity-75"
        onClick={() => setActiveModal(true)}
      />
      <Modal
        activeModal={activeModal}
        onClose={() => setActiveModal(false)}
        title="إضافة الماركة"
        footerContent={
          <Button
            text="أضافة"
            isLoading={isLoading}
            className="btn-dark py-2 px-4 bg-slate-950"
            onClick={handleSubmit(onSubmit)}
          />
        }
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-base text-slate-600 dark:text-slate-300">
            <Textinput
              label="اسم الماركة"
              type="text"
              placeholder="ادخل اسم الماركة"
              name="name"
              register={register}
              error={errors.name}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddBrandModal;
