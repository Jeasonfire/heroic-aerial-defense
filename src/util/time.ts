class Time {
    public static delta = 0;
    public static total_ms = 0;
    private static last_time = 0;

    public static update_time(time: number) {
        Time.delta = (time - Time.last_time) / 1000.0;
        Time.total_ms = time;
        Time.last_time = time;
    }
}
