// Copyright (c) 2023 S44, LLC
// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

import { IERoamingPushEvseRepository } from "../../../interfaces";
import { SequelizeRepository } from "./Base";
import { ERoamingEvseData } from "../model/ERoamingEvseData";

export class ERoamingEvseDataRepository extends SequelizeRepository<ERoamingEvseData> implements IERoamingPushEvseRepository {
    
    async createOrUpdateERoamingPushEvseBySessionId(): Promise<ERoamingEvseData> {
        let evseData = await this.s.models[ERoamingEvseData.MODEL_NAME]
            .findOne({ where: { evseId: "DE*STB*E123456" } }).then(row => row as ERoamingEvseData);
        return evseData
    }

}