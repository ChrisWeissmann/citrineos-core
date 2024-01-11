/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2023 S44, LLC
 */
/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Request_ Body
 * urn:x-enexis:ecdm:uid:2:234744
 *
 */
import { LocationEnumType, MeasurandEnumType, PhaseEnumType, ReadingContextEnumType } from "../enums";
import { OcppRequest } from "../../..";

export interface MeterValuesRequest extends OcppRequest {
  customData?: CustomDataType;
  /**
   * Request_ Body. EVSEID. Numeric_ Identifier
   * urn:x-enexis:ecdm:uid:1:571101
   * This contains a number (&gt;0) designating an EVSE of the Charging Station. ‘0’ (zero) is used to designate the main power meter.
   *
   */
  evseId: number;
  /**
   * @minItems 1
   */
  meterValue: [MeterValueType, ...MeterValueType[]];
}
/**
 * This class does not get 'AdditionalProperties = false' in the schema generation, so it can be extended with arbitrary JSON properties to allow adding custom data.
 */
export interface CustomDataType {
  vendorId: string;
  [k: string]: unknown;
}
/**
 * Meter_ Value
 * urn:x-oca:ocpp:uid:2:233265
 * Collection of one or more sampled values in MeterValuesRequest and TransactionEvent. All sampled values in a MeterValue are sampled at the same point in time.
 *
 */
export interface MeterValueType {
  customData?: CustomDataType;
  /**
   * @minItems 1
   */
  sampledValue: [SampledValueType, ...SampledValueType[]];
  /**
   * Meter_ Value. Timestamp. Date_ Time
   * urn:x-oca:ocpp:uid:1:569259
   * Timestamp for measured value(s).
   *
   */
  timestamp: string;
}
/**
 * Sampled_ Value
 * urn:x-oca:ocpp:uid:2:233266
 * Single sampled value in MeterValues. Each value can be accompanied by optional fields.
 *
 * To save on mobile data usage, default values of all of the optional fields are such that. The value without any additional fields will be interpreted, as a register reading of active import energy in Wh (Watt-hour) units.
 *
 */
export interface SampledValueType {
  customData?: CustomDataType;
  /**
   * Sampled_ Value. Value. Measure
   * urn:x-oca:ocpp:uid:1:569260
   * Indicates the measured value.
   *
   *
   */
  value: number;
  context?: ReadingContextEnumType;
  measurand?: MeasurandEnumType;
  phase?: PhaseEnumType;
  location?: LocationEnumType;
  signedMeterValue?: SignedMeterValueType;
  unitOfMeasure?: UnitOfMeasureType;
}
/**
 * Represent a signed version of the meter value.
 *
 */
export interface SignedMeterValueType {
  customData?: CustomDataType;
  /**
   * Base64 encoded, contains the signed data which might contain more then just the meter value. It can contain information like timestamps, reference to a customer etc.
   *
   */
  signedMeterData: string;
  /**
   * Method used to create the digital signature.
   *
   */
  signingMethod: string;
  /**
   * Method used to encode the meter values before applying the digital signature algorithm.
   *
   */
  encodingMethod: string;
  /**
   * Base64 encoded, sending depends on configuration variable _PublicKeyWithSignedMeterValue_.
   *
   */
  publicKey: string;
}
/**
 * Represents a UnitOfMeasure with a multiplier
 *
 */
export interface UnitOfMeasureType {
  customData?: CustomDataType;
  /**
   * Unit of the value. Default = "Wh" if the (default) measurand is an "Energy" type.
   * This field SHALL use a value from the list Standardized Units of Measurements in Part 2 Appendices.
   * If an applicable unit is available in that list, otherwise a "custom" unit might be used.
   *
   */
  unit?: string;
  /**
   * Multiplier, this value represents the exponent to base 10. I.e. multiplier 3 means 10 raised to the 3rd power. Default is 0.
   *
   */
  multiplier?: number;
}





