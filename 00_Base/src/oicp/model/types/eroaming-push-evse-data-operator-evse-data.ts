// Copyright (c) 2024 Stackbox GmbH
// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0


 /**
 * 
 *
 * @export
 * @interface ERoamingPushEvseDataOperatorEvseData
 */
export interface ERoamingPushEvseDataOperatorEvseData {

    /**
     * @type {OperatorID}
     * @memberof ERoamingPushEvseDataOperatorEvseData
     */
    operatorID: string;

    /**
     * Free text for operator
     *
     * @type {string}
     * @memberof ERoamingPushEvseDataOperatorEvseData
     */
    operatorName: string;

    /**
     * EVSE entries
     *
     * @type {Array<EvseDataRecord>}
     * @memberof ERoamingPushEvseDataOperatorEvseData
     */
    evseDataRecord: Array<string>;
}
