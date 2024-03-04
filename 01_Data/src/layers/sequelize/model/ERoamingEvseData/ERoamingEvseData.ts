// Copyright (c) 2023 S44, LLC
// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

import { ChargingStateEnumType, CustomDataType, ERoamingPushEvseDataOperatorEvseData, EVSEType, MeterValueType, OcpiNamespace, ReasonEnumType, TransactionEventRequest, TransactionType } from '@citrineos/base';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    HasMany,
    BelongsTo,
    BelongsToMany,
  } from 'sequelize-typescript';


@Table
export class ERoamingEvseData extends Model implements ERoamingPushEvseDataOperatorEvseData {

  static readonly MODEL_NAME: string = OcpiNamespace.ERoamingEvseData;

  @Column({
    unique: true
  })
  declare stationId: string;


  @Column({
    unique: true
  })
  declare evseId: string;

  @Column(DataType.STRING)
  declare operatorID: string;

  @Column(DataType.STRING)
  declare operatorName: string;

  @Column(DataType.STRING)
  declare evseDataRecord: string[];

}
