/**
 * Generator params socket
 * @param ptGroup
 * @param ptCommand
 * @param params
 * @returns
 */
export const generatorParam = (
  ptGroup: number,
  ptCommand: number,
  params: Object
) => {
  return {
    ptDevice: "",
    ptGroup: ptGroup,
    ptCommand: ptCommand,
    params: params,
  };
};
