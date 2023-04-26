import React from "react";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const data = [
    {
      label: "الاسم الاول",
      data: "firstname",
      text: "إذا كنت تريد تغيير الاسم الاول المرتبط بحسابك على أمازون، يمكنك فعل ذلك أدناه. تأكد من الضغط على زر حفظ التغييرات عند الإنتهاء.",
      inputs: [{ label: "اسم اول جديد", data: "firstname", type: "text" }],
    },
    {
      label: "الاسم الاخير",
      data: "lastname",
      text: "إذا كنت تريد تغيير الاسم الاخير المرتبط بحسابك على أمازون، يمكنك فعل ذلك أدناه. تأكد من الضغط على زر حفظ التغييرات عند الإنتهاء.",
      inputs: [{ label: "اسم اخير جديد ", data: "lastname", type: "text" }],
    },
    {
      label: "البريد الالكتروني",
      data: "email",
      text: "أدخل عنوان البريد الإلكتروني الجديد الذي تود أن إقرانه بحسابك أدناه",
      inputs: [
        { label: "ادخال بريد الكتروني جديد", data: "email", type: "email" },
      ],
    },
    {
      label: "الهاتف",
      data: "mobile",
      text: "يعد تسجيل رقم الهاتف المحمول، موافقة منك على تلقي إشعارات أمان تلقائية عبر رسالة نصية",
      inputs: [{ label: "رقم هاتف جديد", data: "mobile", type: "number" }],
    },
    {
      label: "كلمة المرور",
      data: "password",
      text: "استخدم النموذج أدناه لتغيير كلمة سر حسابك",
      inputs: [
        {
          label: "كلمة المرور الحاليه",
          data: "currentPassword",
          type: "password",
        },
      ],
    },
  ];

  const dataLabel = data.map((label, index) => {
    return (
      <div
        key={label.data}
        className={`d-flex px-3 py-3 justify-content-between align-items-center w-100 ${
          index + 1 === data.length ? null : "border-bottom"
        }`}
      >
        <div>
          <p className="mb-0 fw-semibold">{label.label}</p>
          <p className="mb-0 fs-7">
            {label.data === "password" ? "*******" : user?.[label.data]}
          </p>
        </div>
        <Link
          to="/my-account/edit"
          state={{ ...label, userData: user?.[label.data] }}
          className="btn btn-sm btn-light shadow-sm px-4"
        >
          تعديل
        </Link>
      </div>
    );
  });
  return (
    <>
      <header className="bg-white d-flex justify-content-center py-4">
        <span className="fs-6  text-secondary">
          <span className="">الرئيسيه</span>
          <BsDot className="fs-5" />
          <span>حسابي</span>
        </span>
      </header>
      <div className="account">
        <div className="container">
          <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
            <div
              style={{ minWidth: "360px" }}
              className="w-50 border border-1 rounded-3 py-1"
            >
              {dataLabel}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
