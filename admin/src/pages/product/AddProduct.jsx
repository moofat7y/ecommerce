import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Select } from "antd";
import { notifyWarning, sizes, tags } from "../../utils/helpers";
import BtnLoading from "../../components/loading/BtnLoading";
import ImgListUploader from "../../components/product/ImgListUploader";
import { BiReset } from "react-icons/bi";
import showDeleteConfirm from "../../components/CustomModal";
import {
  createProduct,
  updateProduct,
} from "../../features/products/productSlice";
import { resetImageState } from "../../features/images/imageSlice";
import { resetState } from "../../features/products/productSlice";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, brand, pCategory, color, image } = useSelector(
    (state) => state
  );
  const { updatedProduct } = product;
  const colors = [];
  color.colors?.forEach((color) => {
    colors.push({ label: color.title, value: color._id });
  });

  const onSubmit = async (formData) => {
    if (image.images.length === 0) {
      return notifyWarning("Images required");
    }
    const data = { ...formData, images: image.images };
    if (updatedProduct) {
      await dispatch(
        updateProduct({ data, prodId: updatedProduct._id, navigate })
      );
      dispatch(resetImageState());
      return;
    }
    await dispatch(createProduct({ data, navigate }));
    dispatch(resetImageState());
  };

  const onBackToEdit = () => {
    if (image.images.length === 0) {
      return notifyWarning("Images required");
    }
    const imagesArray = JSON.stringify(image?.images);
    const updatedProductImages = JSON.stringify(updatedProduct?.images);
    const data = { ...getValues(), images: image.images };
    if (imagesArray !== updatedProductImages) {
      return showDeleteConfirm({
        title: "Confirm",
        action: updateProduct({ data, prodId: updatedProduct._id, navigate }),
        text: "Some changes not save press ok to save changes and no to back to edit",
        dispatch,
      });
    }
    reset();
    dispatch(resetImageState());
    dispatch(resetState());
  };

  useEffect(() => {
    if (updatedProduct) {
      setValue("title", updatedProduct.title);
      setValue("description", updatedProduct.description);
      setValue("brand", updatedProduct.brand);
      setValue("colors", updatedProduct.colors);
      setValue("quantity", updatedProduct.quantity);
      setValue("price", updatedProduct.price);
      setValue("size", updatedProduct.size);
      setValue("category", updatedProduct.category);
      setValue("tag", updatedProduct.tag);
    }
  }, [updatedProduct]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/dashboard/product-list">Products</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {updatedProduct ? "Edit" : "Add"} Product
          </li>
        </ol>
      </nav>
      <h4 className="">{updatedProduct ? "Edit" : "Add"} Product</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="product__add-product">
        <div className="d-flex  justify-content-between gap-4">
          <div className="left p-4 rounded-3 bg-light ">
            <h5 className="mb-4">Basic Information</h5>
            <div className="form-group mb-3">
              <label className="form-label">Title</label>
              <input
                {...register("title", {
                  required: "Title required",
                  minLength: {
                    value: 6,
                    message: "Min length must be 6 chracters",
                  },
                })}
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
              />
              {errors.title ? (
                <div className="invalid-feedback">{errors.title.message}</div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Description</label>
              <textarea
                {...register("description", {
                  required: "Description required",
                  minLength: {
                    value: 30,
                    message: "Min length must be 30 chracters",
                  },
                })}
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                name="description"
                rows="10"
              ></textarea>
              {errors.description ? (
                <div className="invalid-feedback">
                  {errors.description.message}
                </div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Brand</label>
              <select
                {...register("brand", { required: "Brand requried" })}
                className={`form-select ${errors.brand ? "is-invalid" : ""}`}
              >
                <option value="">none</option>
                {brand?.brands?.map((brand, index) => (
                  <option key={index} value={brand.title}>
                    {brand.title}
                  </option>
                ))}
              </select>
              {errors.brand ? (
                <div className="invalid-feedback">{errors.brand.message}</div>
              ) : null}
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Colors</label>
              <Controller
                control={control}
                name="colors"
                render={({ field }) => (
                  <Select
                    placeholder="Select color"
                    className={`w-100  ${errors.colors ? "is-invalid" : ""}`}
                    mode="multiple"
                    status={errors.colors ? "error" : ""}
                    {...field}
                    defaultValue={field.defaultValue}
                  >
                    {Object.values(colors).map((color, index) => (
                      <Select.Option
                        value={color.label}
                        key={color.value + index}
                      >
                        {color.label}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              ></Controller>
              {errors.colors ? (
                <div className="invalid-feedback">{errors.colors.message}</div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Sizes</label>
              <Controller
                control={control}
                name="size"
                render={({ field }) => (
                  <Select
                    placeholder="Select Size"
                    className={`w-100  `}
                    mode="tags"
                    {...field}
                    defaultValue={field.defaultValue}
                  >
                    {Object.values(sizes).map((size, index) => (
                      <Select.Option
                        value={size.label}
                        key={size.value + index}
                      >
                        {size.label}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              ></Controller>
            </div>
            <h5 className="mt-5 mb-3">Pricing & Stock Quantity</h5>
            <div className="row g-3">
              <div className="col">
                <label htmlFor="" className="form-label">
                  Price
                </label>
                <input
                  {...register("price", {
                    required: "Price required",
                  })}
                  type="number"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                />
                {errors.price ? (
                  <div className="invalid-feedback">{errors.price.message}</div>
                ) : null}
              </div>
              <div className="col">
                <label htmlFor="" className="form-label">
                  Quantity
                </label>
                <input
                  {...register("quantity", { required: "Quantity required" })}
                  type="number"
                  min={0}
                  className={`form-control ${
                    errors.quantity ? "is-invalid" : ""
                  }`}
                />
                {errors.quantity ? (
                  <div className="invalid-feedback">
                    {errors.quantity.message}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="right align-self-start p-4 rounded-3 bg-light ">
            <h5 className="mb-4">Categories & Images</h5>
            <div className="form-group mb-3">
              <label className="form-label">Category</label>
              <select
                {...register("category", { required: "Category required" })}
                className={`form-select ${errors.category ? "is-invalid" : ""}`}
              >
                <option value="">none</option>
                {pCategory.categories?.map((category, index) => (
                  <option key={index + category} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
              {errors.category ? (
                <div className="invalid-feedback">
                  {errors.category.message}
                </div>
              ) : null}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Tags</label>

              <select
                {...register("tag")}
                className={`form-select ${errors.tag ? "is-invalid" : ""}`}
              >
                <option value="">none</option>
                {tags?.map((tag, index) => (
                  <option key={index + tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              {errors.tag ? (
                <div className="invalid-feedback">{errors.tag.message}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="" className="form-label">
                Images
              </label>
              <ImgListUploader />
            </div>
            <div className="d-flex mt-3 gap-3 align-items-center">
              <BtnLoading
                label={updatedProduct ? "Edit Product" : "Add Product"}
                bgcolor="btn-primary"
                loading={product.isLoading || image.isLoading}
                extraClass="w-100"
              />
              {updatedProduct ? (
                <button
                  disabled={product.isLoading || image.isLoading}
                  type="button"
                  onClick={() => onBackToEdit()}
                  className="btn btn-secondary"
                >
                  <BiReset />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
