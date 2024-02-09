// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

import { RegistrationStatusEnumType, defineConfig } from "@citrineos/base";
import { SystemConfigInput } from "@citrineos/base/lib/config/types";

export function createDotenvConfig() {
    const defaultConfig: SystemConfigInput = {
        env: "development",
        modules: {
            certificates: {
                endpointPrefix: "/certificates"
            },
            configuration: {
                heartbeatInterval: 60,
                bootRetryInterval: 15,
                unknownChargerStatus: RegistrationStatusEnumType.Accepted,
                getBaseReportOnPending: true,
                bootWithRejectedVariables: true,
                autoAccept: false,
                endpointPrefix: "/configuration"
            },
            evdriver: {
                endpointPrefix: "/evdriver"
            },
            monitoring: {
                endpointPrefix: "/monitoring"
            },
            reporting: {
                endpointPrefix: "/reporting"
            },
            smartcharging: {
                endpointPrefix: "/smartcharging"
            },
            transactions: {
                endpointPrefix: "/transactions"
            },
        },
        data: {
            sequelize: {
                host: "localhost",
                port: 5432,
                database: "citrine",
                dialect: "postgres",
                username: "citrine",
                password: "citrine",
                storage: "",
                sync: true,
            }
        },
        util: {
            cache: {
                memory: true
            },
            messageBroker: {
                amqp: {
                    url: "amqp://guest:guest@localhost:5672",
                    exchange: "citrineos",
                }
            },
            swagger: {
                path: "/docs",
                logoPath: "./src/assets/logo.png",
                exposeData: true,
                exposeMessage: true
            }
        },
        server: {
            logLevel: 2, // debug
            host: "0.0.0.0",
            port: 8080
        },
        websocket: {
            pingInterval: 60,
            maxCallLengthSeconds: 5,
            maxCachingSeconds: 10
        },
        websocketServer: [{
            securityProfile: 0,
            host: "0.0.0.0",
            port: 8081,
            protocol: "ocpp2.0.1"
        }, {
            securityProfile: 1,
            host: "0.0.0.0",
            port: 8082,
            protocol: "ocpp2.0.1"
        }]
    };

    function mergeConfigFromEnvVars<T extends Record<string, any>>(defaultConfig: T, envVars: NodeJS.ProcessEnv): T {
        const config: Record<string, any> = JSON.parse(JSON.stringify(defaultConfig));
        const prefix = "CITRINEOS_";
    
        Object.keys(envVars).forEach((fullEnvKey) => {
            if (fullEnvKey.startsWith(prefix)) {
                const envKeyWithoutPrefix = fullEnvKey.substring(prefix.length);
                const path = envKeyWithoutPrefix.split('_');
                let currentConfigPart = config;
    
                for (let i = 0; i < path.length - 1; i++) {
                    const part = path[i];
                    if (!currentConfigPart[part] || typeof currentConfigPart[part] !== 'object') {
                        currentConfigPart[part] = {}; 
                    }
                    currentConfigPart = currentConfigPart[part];
                }
    
                const key = path[path.length - 1];
                try {
                    currentConfigPart[key] = JSON.parse(envVars[fullEnvKey] as string);
                } catch {
                    currentConfigPart[key] = envVars[fullEnvKey];
                }
            }
        });
        return config as T;
    }
    
    const appConfig = mergeConfigFromEnvVars(defaultConfig, process.env);

    return defineConfig(appConfig);
}
