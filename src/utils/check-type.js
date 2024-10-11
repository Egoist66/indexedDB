/**
 * Checks if value is of type (checks the prototype chain)
 *
 * @param {*} [value=null] - The value to check the type of
 * @param {function} [type=function () {}] - The type to check against
 * @returns {{type: string, subType: string, isValid: boolean} | {msg: string}}
 */
export function checkType(value = null, type = function () {}) {
  const getObjectType = (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1);
  };

  if (typeof type === "function") {
    if (value === null) {
      return { msg: "Type Null does not have parent prototype" };
    }

    if (value.__proto__ === type.prototype) {
      if (Array.isArray(value)) {
        return { type: "array", isValid: true };
      }
      return {
        type: typeof value,
        subType: getObjectType(value),
        isValid: true,
      };
    } else {
      throw new Error("Type validation error!");
    }
  }
}
