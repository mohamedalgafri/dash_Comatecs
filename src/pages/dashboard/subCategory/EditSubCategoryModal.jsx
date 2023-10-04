import React, { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import baseUrl from "../../../api/baseURL";
import axios from "axios";
import { toast } from "react-toastify";

const EditSubCategoryModal = ({
  show,
  setShow,
  idEdit,
  nameEdit,
  getAllData,
}) => {
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup
    .object({
      name: yup.string().required("يرجى إدخال اسم التصنيف الفرعي"),
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

  useEffect(() => {
    reset();
  }, [nameEdit]);

  const onSubmit = (data) => {
    setIsLoading(true);

    baseUrl
      .put("api/SubCategory", {
        id: idEdit,
        name: data.name,
      })
      .then((res) => {
        setActiveModal(false);
        setShow(false);
        getAllData();
        reset();
        toast.success("تم تعديل التصنيف الفرعي", {
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
      <Modal
        activeModal={show}
        title="تعديل التصنيف الفرعي"
        onClose={() => {
          setActiveModal(false);
          setShow(false);
          reset();
        }}
        footerContent={
          <Button
            text="تعديل"
            isLoading={isLoading}
            className="btn-dark py-2 px-4 bg-slate-950"
            onClick={handleSubmit(onSubmit)}
          />
        }
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-base text-slate-600 dark:text-slate-300">
            <Textinput
              label="اسم التصنيف الفرعي"
              type="text"
              placeholder="ادخل اسم التصنيف الفرعي"
              name="name"
              register={register}
              error={errors.name}
              defaultValue={nameEdit}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditSubCategoryModal;
