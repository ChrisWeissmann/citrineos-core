// Copyright (c) 2024 Stackbox GmbH
// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

// import { TransactionEventQuerySchema } from "@citrineos/data";
import { ILogObj, Logger } from 'tslog';
import { IRoamingOicpModuleApi } from './interface';
import { RoamingOicpModule } from './module';
import { AbstractModuleApi, AsDataEndpoint, Namespace, HttpMethod } from "@citrineos/base";
import { FastifyInstance } from "fastify";

/**
 * Server API for the roaming oicp module.
 */
export class RoamingOicpModuleApi extends AbstractModuleApi<RoamingOicpModule> implements IRoamingOicpModuleApi {

    /**
     * Constructor for the class.
     *
     * @param {RoamingOicpModule} roamingOicpModule - The roaming oicp module.
     * @param {FastifyInstance} server - The server instance.
     * @param {Logger<ILogObj>} [logger] - Optional logger.
     */
    constructor(roamingOicpModule: RoamingOicpModule, server: FastifyInstance, logger?: Logger<ILogObj>) {
        super(roamingOicpModule, server, logger);
    }

    /**
     * Data Endpoint Methods
     */

    @AsDataEndpoint(Namespace.TransactionEventRequest, HttpMethod.Post)
    // pushEvseDataFullLoad(identifier: string, tenantId: string, callbackUrl?: string): Promise<boolean> {
    pushEvseDataFullLoad(identifier: string, tenantId: string, callbackUrl?: string): boolean {
        // TODO: Implement pushEvseDataFullLoad
        this._logger.info("pushEvseDataFullLoad called");
        return true;
    }

    /**
    * Overrides superclass method to generate the URL path based on the input {@link CallAction} and the module's endpoint prefix configuration.
    *
    * @param {CallAction} input - The input {@link CallAction}.
    * @return {string} - The generated URL path.
    */
    // protected _toMessagePath(input: CallAction): string {
    //     const endpointPrefix = this._module.config.modules.transactions.endpointPrefix;
    //     return super._toMessagePath(input, endpointPrefix);
    // }

    /**
     * Overrides superclass method to generate the URL path based on the input {@link Namespace} and the module's endpoint prefix configuration.
     *
     * @param {Namespace} input - The input {@link Namespace}.
     * @return {string} - The generated URL path.
     */
    protected _toDataPath(input: Namespace): string {
        const endpointPrefix = this._module.config.modules.transactions.endpointPrefix;
        return super._toDataPath(input, "roamingoicp");
    }
}