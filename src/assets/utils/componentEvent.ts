class ComponentEvent extends CustomEvent<{ waypointId: string }> {
    readonly waypointId: string;

    constructor(type: "enter" | "exit", waypointId: string) {
        super(`component-${type}`, { detail: { waypointId: waypointId }});
        this.waypointId = waypointId;
    }
}

export default ComponentEvent;