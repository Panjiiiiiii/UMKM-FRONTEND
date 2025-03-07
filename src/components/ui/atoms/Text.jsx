// components/atoms/Typography.js
import { cn } from "@/utils/cn";

export const H1 = ({ children, className }) => (
  <h1 className={cn("text-[44px] font-bold text-[#3B694E]", className)}>
    {children}
  </h1>
);

export const H2 = ({ children, className }) => (
  <h2 className={cn("text-[36px] font-bold text-[#3B694E]", className)}>
    {children}
  </h2>
);

export const H3 = ({ children, className }) => (
  <h3 className={cn("text-[28px] font-bold text-[#3B694E]", className)}>
    {children}
  </h3>
);

export const H4 = ({ children, className }) => (
  <h4 className={cn("text-[24px] font-bold text-[#3B694E]", className)}>
    {children}
  </h4>
);

export const H5 = ({ children, className }) => (
  <h5 className={cn("text-[20px] font-bold text-[#3B694E]", className)}>
    {children}
  </h5>
);

export const H6 = ({ children, className }) => (
  <h6 className={cn("text-[16px] font-bold text-[#3B694E]", className)}>
    {children}
  </h6>
);

export const P = ({ children, className }) => (
  <p className={cn("text-[16px] font-thin text-[#3B694E]", className)}>
    {children}
  </p>
);