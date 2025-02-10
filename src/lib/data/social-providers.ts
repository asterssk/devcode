import { TDataMap, TSocialProviders } from "../types";

export const socialProviders = new Map<TSocialProviders, TDataMap>([
  ["github", { icon: "/github.svg", enabled: true, label: "Github" }],
  ["facebook", { icon: "/meta.svg", enabled: true, label: "Meta" }],
  ["twitter", { icon: "/twitter-x.svg", enabled: false, label: "Twitter-X" }],
  ["google", { icon: "/google.svg", enabled: true, label: "Google" }],
]);
