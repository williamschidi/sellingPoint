/** Mock agent profiles — replace with GET /agents/:id when backend is ready. */

export const MOCK_AGENTS = {
  "agent-lagos-1": {
    id: "agent-lagos-1",
    name: "Chioma Okonkwo",
    phone: "+2348034567890",
    whatsapp: "+2348034567890",
    agency: "Lekki Prime Realty",
    location: { city: "Lagos", state: "Lagos State" },
  },
  "agent-rivers-1": {
    id: "agent-rivers-1",
    name: "Emeka Nwosu",
    phone: "+2348056789012",
    whatsapp: "+2348056789012",
    agency: "GRA Lands & Estates",
    location: { city: "Port Harcourt", state: "Rivers State" },
  },
  "agent-abuja-1": {
    id: "agent-abuja-1",
    name: "Fatima Bello",
    phone: "+2348078901234",
    whatsapp: "+2348078901234",
    agency: "Capital Territory Properties",
    location: { city: "Abuja", state: "FCT Abuja" },
  },
  "agent-anambra-1": {
    id: "agent-anambra-1",
    name: "Oluwaseun Adeyemi",
    phone: "+2347033881174",
    whatsapp: "+2347033881174",
    agency: "Prime Lands Nigeria Ltd",
    location: { city: "Awka", state: "Anambra State" },
  },
  "agent-south-1": {
    id: "agent-south-1",
    name: "Adaobi Eze",
    phone: "+2348090123456",
    whatsapp: "+2348090123456",
    agency: "Eastern Gateway Realty",
    location: { city: "Enugu", state: "Enugu State" },
  },
};

export const DEFAULT_AGENT = MOCK_AGENTS["agent-anambra-1"];

/** Maps listing state keywords to a mock agent profile. */
export function resolveMockAgent(state = "") {
  const normalized = state.toLowerCase();
  if (normalized.includes("lagos")) return MOCK_AGENTS["agent-lagos-1"];
  if (normalized.includes("rivers")) return MOCK_AGENTS["agent-rivers-1"];
  if (normalized.includes("abuja") || normalized.includes("fct")) {
    return MOCK_AGENTS["agent-abuja-1"];
  }
  if (normalized.includes("anambra")) return MOCK_AGENTS["agent-anambra-1"];
  return MOCK_AGENTS["agent-south-1"];
}
