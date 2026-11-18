function template({imports, interfaces, componentName, props, jsx}, {tpl}) {
  return tpl`
    ${imports}
    import type { IconProps } from "../types";
    ${interfaces}

    const ${componentName} = ({size = "1em", color = "currentColor", ...props }: IconProps, ref: Ref<SVGSVGElement> ) => ${jsx};

    const ForwardRef = /* @__PURE__ */ forwardRef(${componentName});
    export { ForwardRef as ${componentName} };
    `
}

module.exports = template