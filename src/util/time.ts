class Time {
    public delta = 0;
    public total_ms = 0;
    private last_time = 0;

    public update_time(time: number) {
        this.delta = (time - this.last_time) / 1000.0;
        this.total_ms = time;
        this.last_time = time;
    }
}
