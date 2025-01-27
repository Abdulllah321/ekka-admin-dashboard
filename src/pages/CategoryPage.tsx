import { Link } from "react-router";
import CategoryDetails from "../components/category/CategoryDetails";
import CategoryForm from "../components/category/CategoryForm";
import Layout from "../components/common/Layout";

const CategoryPage = () => {
  return (
    <Layout>
      <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
        <h1>Main Category</h1>
        <p className="breadcrumbs">
          <span>
            <Link to="/">Home</Link>
          </span>
          <span>
            <i className="mdi mdi-chevron-right"></i>
          </span>
          Main Category
        </p>
      </div>
      <div className="row">
        {" "}
        <div className="col-xl-4 col-lg-12">
          <CategoryForm />
        </div>
        <CategoryDetails />
      </div>
    </Layout>
  );
};

export default CategoryPage;
