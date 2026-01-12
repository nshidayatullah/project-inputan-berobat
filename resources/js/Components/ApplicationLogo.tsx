import * as React from "react";

export default function ApplicationLogo(
    props: React.ImgHTMLAttributes<HTMLImageElement>
) {
    return <img {...props} src="/logo.png" alt="SIM Klinik PPA BIB Logo" />;
}
