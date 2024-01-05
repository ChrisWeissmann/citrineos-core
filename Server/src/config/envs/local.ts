import { RegistrationStatusEnumType, defineConfig } from "@citrineos/base";

export function createLocalConfig() {
    return defineConfig({
        env: "development",
        modules: {
            certificates: {
                endpointPrefix: "/certificates",
                host: "localhost",
                port: 8081
            },
            configuration: {
                heartbeatInterval: 60,
                bootRetryInterval: 15,
                unknownChargerStatus: RegistrationStatusEnumType.Accepted,
                getBaseReportOnPending: true,
                bootWithRejectedVariables: true,
                autoAccept: true,
                endpointPrefix: "/configuration",
                host: "localhost",
                port: 8081
            },
            evdriver: {
                endpointPrefix: "/evdriver",
                host: "localhost",
                port: 8081
            },
            monitoring: {
                endpointPrefix: "/monitoring",
                host: "localhost",
                port: 8081
            },
            reporting: {
                endpointPrefix: "/reporting",
                host: "localhost",
                port: 8081
            },
            smartcharging: {
                endpointPrefix: "/smartcharging",
                host: "localhost",
                port: 8081
            },
            transactions: {
                endpointPrefix: "/transactions",
                host: "localhost",
                port: 8081
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
                redis: {
                    host: "localhost",
                    port: 6379,
                }
            },
            messageBroker: {
                amqp: {
                    url: "amqp://guest:guest@localhost:5672",
                    exchange: "citrineos",
                }
            }
        },
        server: {
            logLevel: 3,
            host: "localhost",
            port: 8081,
            swagger: {
                path: "/docs",
                exposeAdmin: true,
                exposeData: true,
                exposeMessage: true
            }
        },
        websocket: {
            pingInterval: 60,
            maxCallLengthSeconds: 5,
            maxCachingSeconds: 10
        },
        websocketServer: [{
            securityProfile: 0,
            host: "localhost",
            port: 8080,
            protocol: "ocpp2.0.1"
        }]
    });
}