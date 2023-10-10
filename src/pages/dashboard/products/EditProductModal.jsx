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
import { Field, Form, Formik } from "formik";

const EditProductModal = ({ show, setShow, idEdit, nameEdit, getAllData }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Modal
        activeModal={show}
        title="تعديل تصنيف"
        onClose={() => {
          setActiveModal(false);
          setShow(false);
        }}
      >
        <Formik
          initialValues={{
            name: nameEdit,
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required("اسم التصنيف  مطلوب"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setIsLoading(true);
            try {
              let data = JSON.parse(JSON.stringify(values));
              await baseUrl.put(`api/Category`, {
                id: idEdit,
                name: data.name,
              });
              console.log(data);
              setActiveModal(false);
              setShow(false);
              getAllData();
              toast.success("تم إضافة تصنيف ", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                rtl: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } catch (error) {
              console.error(error);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="text-base text-slate-600 dark:text-slate-300">
                <div>
                  <label htmlFor="category" className="form-label">
                    اسم التصنيف
                  </label>
                  <Field
                    label="اسم التصنيف "
                    name="name"
                    value={values.name}
                    type="text"
                    placeholder="ادخل اسم التصنيف "
                    onChange={handleChange}
                    className="form-control py-2"
                  />
                  {errors.name && (
                    <p className="text-danger-500 block text-sm flex mt-2">
                      {errors.name}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  text="تعديل"
                  isLoading={isLoading}
                  className="btn-dark py-2 mt-4 mr-auto px-4 bg-slate-950"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditProductModal;
