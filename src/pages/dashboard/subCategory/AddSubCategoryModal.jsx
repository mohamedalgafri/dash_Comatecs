import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import baseUrl from "../../../api/baseURL";
import { toast } from "react-toastify";

const SubAddCategoryModal = ({ getAllData, dataCategory }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [selectCategory, setSelectCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup
    .object({
      name: yup.string().required(" يرجى إدخال اسم التصنيف الفرعي"),
      category: yup.string().required(" يرجى إدخال اسم التصنيف "),
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
    console.log(selectCategory);
    baseUrl
      .post("api/SubCategory", {
        name: data.name,
        categoryId: selectCategory,
      })
      .then((res) => {
        setActiveModal(false);
        getAllData();
        reset();
        toast.success("تم إضافة تصنيف فرعي", {
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
        text="أضف تصنيف فرعي"
        className="py-2 px-4 bg-slate-950 text-white font-semibold rounded-lg hover:bg-gray-900 focus:ring-opacity-75"
        onClick={() => setActiveModal(true)}
      />
      <Modal
        activeModal={activeModal}
        onClose={() => setActiveModal(false)}
        title="إضافة تصنيف فرعي"
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
              label="اسم التصنيف الفرعي"
              type="text"
              placeholder="ادخل اسم التصنيف الفرعي"
              name="name"
              register={register}
              error={errors.name}
            />
            <div className="mt-3">
              <label htmlFor=" hh23" className="form-label">
                اختر التصنيف
              </label>

              <select
                name="category"
                className="form-control py-2"
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                <option value="">اختر التصنيف</option>
                {dataCategory.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.category ? (
                <p className=" mt-2  text-danger-500 block text-sm flex">
                  {errors.category.message}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SubAddCategoryModal;
