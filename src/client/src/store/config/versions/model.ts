import { IVersions } from "../../../types/version";
import { WIZARD_INFO_TYPEKEYS } from "../../typeKeys";

export interface IVersionData {
  type: WIZARD_INFO_TYPEKEYS.GET_TEMPLATE_INFO;
  payload: IVersions;
}