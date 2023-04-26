import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  BsDot,
  BsFillTelephoneFill,
  MdEmail,
  IoLocationSharp,

} from "react-icons/all";
import Section from "../../components/Section";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <div>
      <header className="bg-white d-flex justify-content-center py-4">
        <span className="fs-6  text-secondary">
          <span className="">الرئيسيه</span>
          <BsDot className="fs-5" />
          <span>تواصل معنا</span>
        </span>
      </header>
      <Section className="contact-us-wrapper-1">
        <div className="row p-3 bg-white shadow-sm rounded-3 mb-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="col-12 col-md-8 p-2 d-flex flex-column gap-3"
          >
            <h1 className="fs-5 fw-bolder">اترك رساله</h1>
            <div>
              <div className="mb-3 row justify-content-start">
                <label htmlFor="subject" className="col-sm-3 col-form-label">
                  الموضوع
                </label>
                <div className="col-sm-8">
                  <input
                    {...register("password", {
                      required: "يجب ادخال اسم الموضوع",
                    })}
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                  />
                </div>
              </div>
              <div className="mb-3 row justify-content-start">
                <label htmlFor="email" className="col-sm-3 col-form-label">
                  عنوان البريد
                </label>
                <div className="col-sm-8">
                  <input
                    {...register("email", {
                      required: "يجب ادخال بريد الكتروني",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "الرجاء استخدام بريد إلكتروني صالح",
                      },
                    })}
                    type="text"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                  />
                </div>
              </div>
              <div className="mb-3 row justify-content-start">
                <label htmlFor="message" className="col-sm-3 col-form-label">
                  الرساله
                </label>
                <div className="col-sm-8">
                  <textarea
                    {...register("password", {
                      required: "يجب كتابة رسالة",
                    })}
                    name="message"
                    id="message"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-fit-content py-2 px-4 text-white btn btn-primary"
            >
              ارسال
            </button>
          </form>
          <div className="col-12 col-md-4 p-2 d-flex flex-column gap-3">
            <h1 className="fs-5 fw-bolder">معلومات عنا</h1>
            <div>
              <div className="mb-3">
                للحصول على أي تعليقات أو تحسينات على متجرنا عبر الإنترنت ، يرجى
                ملء نموذج الاتصال هذا. سنلقي نظرة ونرد عليك في غضون 24 ساعة.
                نحتاج دائمًا إلى تعليقاتك للاستفادة منها بشكل مستمر.
              </div>
              <div className="mb-3">
                <Link className="nav-link d-flex align-items-center gap-2">
                  <MdEmail className="fs-6 text-dark" />
                  <span className="fs-7">example12@gmail.com</span>
                </Link>
              </div>
              <div className="mb-3 d-flex align-items-center gap-2">
                <IoLocationSharp className="fs-6 text-dark" />
                <span className="fs-7">123 Main Street, Anytown, CA 12345</span>
              </div>
              <div className="mb-3">
                <Link className="nav-link d-flex align-items-center gap-2">
                  <BsFillTelephoneFill className="fs-6 text-dark" />
                  <span className="fs-7">+20 1005623453</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row flex-wrap p-3 bg-white shadow-sm rounded-3 mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13655.887528373623!2d31.753729250000003!3d31.166055399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1681647094819!5m2!1sar!2seg"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Section>
    </div>
  );
};

export default ContactUs;
