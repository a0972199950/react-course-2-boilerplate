import React from "react";
import {Link} from "react-router-dom";

const NotFoundPage = () => (
    <div>
        {/* 使用react-router的Link組件能讓連結點擊後不會跟server連線 */}
        404! -<Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;
