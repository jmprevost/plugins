import { User } from "../user";
export declare class PlanningController {
    constructor();
    /**
     *the controller for all the function in planning templates
     * @param {User} log All the information of the user
     * @param {*} mapApi the api of of the viewer to set the controller
     * @param {*} config the config is for drawing
     * @memberof manageController
     */
    planControl(log: User, mapApi: any, config: any): void;
}