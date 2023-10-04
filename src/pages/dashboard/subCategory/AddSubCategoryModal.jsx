import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import baseUrl from "../../../api/baseURL";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

const SubAddCategoryModal = ({ getAllData, dataCategory }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      >
        <Formik
          initialValues={{
            name: "",
            category: "",
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required("اسم التصنيف الفرعي مطلوب"),
            category: yup.string().required("اختيار التصنيف مطلوب"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setIsLoading(true);
            try {
              let data = JSON.parse(JSON.stringify(values));
              await baseUrl.post(`api/SubCategory`, {
                name: data.name,
                categoryId: data.category,
              });
              console.log(data);
              setActiveModal(false);
              getAllData();
              toast.success("تم إضافة تصنيف فرعي", {
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
                <Field
                  label="اسم التصنيف الفرعي"
                  name="name"
                  value={values.name}
                  type="text"
                  placeholder="ادخل اسم التصنيف الفرعي"
                  onChange={handleChange}
                  className="form-control py-2"
                />
                {errors.name && (
                  <p className="text-danger-500 block text-sm flex mt-2">
                    {errors.name}
                  </p>
                )}
                <div className="mt-3">
                  <label htmlFor="category" className="form-label">
                    اختر التصنيف
                  </label>

                  <Field
                    name="category"
                    as="select"
                    value={values.category}
                    className="form-control py-2"
                    onChange={handleChange}
                  >
                    <option value="">اختر التصنيف</option>
                    {dataCategory.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  {errors.category && (
                    <p className="text-danger-500 block text-sm flex mt-2">
                      {errors.category}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  text="أضافة"
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

export default SubAddCategoryModal;
