// Copyright (c) 2024 Stackbox GmbH
// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

import { AbstractModule, CallAction, SystemConfig, ICache, IMessageSender, IMessageHandler, EventGroup, AsHandler, IMessage, HandlerProperties, StatusNotificationRequest } from "@citrineos/base";
import { IERoamingPushEvseRepository, sequelize } from "@citrineos/data";
import { PubSubReceiver, PubSubSender, Timer } from "@citrineos/util";
import deasyncPromise from "deasync-promise";
import { ILogObj, Logger } from 'tslog';

/**
 * Component that performs Hubject roaming related messages (OICP - Open Intercharge Protocol).
 */
export class RoamingOicpModule extends AbstractModule {

  protected _requests: CallAction[] = [
    CallAction.StatusNotification,
  ];
  protected _responses: CallAction[] = [
  ];

  protected _eRoamingEvsePushDataRepository: IERoamingPushEvseRepository;

  get eRoamingEvsePushDataRepository(): IERoamingPushEvseRepository {
    return this._eRoamingEvsePushDataRepository;
  }

  /**
   * This is the constructor function that initializes the {@link RoamingOicpModule}.
   * 
   * @param {SystemConfig} config - The `config` contains configuration settings for the module.
   *  
   * @param {ICache} [cache] - The cache instance which is shared among the modules & Central System to pass information such as blacklisted actions or boot status.
   * 
   * @param {IMessageSender} [sender] - The `sender` parameter is an optional parameter that represents an instance of the {@link IMessageSender} interface. 
   * It is used to send messages from the central system to external systems or devices. If no `sender` is provided, a default {@link RabbitMqSender} instance is created and used.
   * 
   * @param {IMessageHandler} [handler] - The `handler` parameter is an optional parameter that represents an instance of the {@link IMessageHandler} interface. 
   * It is used to handle incoming messages and dispatch them to the appropriate methods or functions. If no `handler` is provided, a default {@link RabbitMqReceiver} instance is created and used.
   * 
   * @param {Logger<ILogObj>} [logger] - The `logger` parameter is an optional parameter that represents an instance of {@link Logger<ILogObj>}. 
   * It is used to propagate system wide logger settings and will serve as the parent logger for any sub-component logging. If no `logger` is provided, a default {@link Logger<ILogObj>} instance is created and used.
   * 
   */
  constructor(
    config: SystemConfig,
    cache: ICache,
    sender?: IMessageSender,
    handler?: IMessageHandler,
    logger?: Logger<ILogObj>,
    eRoamingEvsePushDataRepository?: IERoamingPushEvseRepository,
  ) {
    super(config, cache, handler || new PubSubReceiver(config, logger), sender || new PubSubSender(config, logger), EventGroup.RoamingOicp, logger);

    const timer = new Timer();
    this._logger.info(`Initializing...`);

    if (!deasyncPromise(this._initHandler(this._requests, this._responses))) {
      throw new Error("Could not initialize module due to failure in handler initialization.");
    }

    this._eRoamingEvsePushDataRepository = eRoamingEvsePushDataRepository || new sequelize.ERoamingEvseDataRepository(config, logger);

    this._logger.info(`Initialized in ${timer.end()}ms...`);
  }

  @AsHandler(CallAction.StatusNotification)
  protected _handleStatusNotification(
    message: IMessage<StatusNotificationRequest>,
    props?: HandlerProperties
  ): void {

    this._logger.debug("OICP: StatusNotification received:", message, props);

    // TODO: Send StatusUpdate to OICP
  }
}