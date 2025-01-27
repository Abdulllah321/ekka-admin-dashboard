import { Link } from "react-router";
import Layout from "../components/common/Layout";
import CouponDetails from "../components/coupon/CouponDetails";
import CouponForm from "../components/coupon/CouponForm";

const CouponsPage = () => {
    return (
        <Layout>
            <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
                <h1>Coupons</h1>
                <p className="breadcrumbs">
                    <span>
                        <Link to={`/`}>Home</Link>
                    </span>
                    <span>
                        <i className="mdi mdi-chevron-right"></i>
                    </span>
                    Coupons
                </p>
            </div>
            <div className="row">
                <div className="col-xl-4 col-lg-12">
                    <CouponForm />
                </div>
                <CouponDetails />
            </div>
        </Layout>
    );
};

export default CouponsPage;