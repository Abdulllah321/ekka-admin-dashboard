import CategoryDetails from "../components/subcategory/SubCategoryDetails";
import CategoryForm from "../components/subcategory/SubCategoryForm";
import Layout from "../components/common/Layout";

const CategoryPage = () => {
  return (
    <Layout>
      <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
        <h1>Sub Category</h1>
        <p className="breadcrumbs">
          <span>
            <a href="index.html">Home</a>
          </span>
          <span>
            <i className="mdi mdi-chevron-right"></i>
          </span>
          Sub Category
        </p>
      </div>
      <div className="row">
        <div className="col-xl-4 col-lg-12">
          <CategoryForm />
        </div>
        <CategoryDetails />
      </div>
    </Layout>
  );
};

export default CategoryPage;
