class ResourceLoader {
    public loaded = 0;

    private images = [];
    private image_map = {};
    private loaded_images_amount = 0;
    private loading_graphic_speed = 1;

    public get_image(name: string) {
        return this.image_map[name];
    }

    public load_images(urls: [string, string][]): number[] {
        let ids = [];
        for (let i = 0; i < urls.length; i++) {
            ids.push(this.load_image(urls[i]));
        }
        return ids;
    }

    public load_image(url: [string, string]): number {
        let id = this.images.length;
        let image = new Image();
        image.src = url[1];
        image.onload = () => {
            this.loaded_images_amount++;
        };
        this.images.push(image);
        this.image_map[url[0]] = image;
        return id;
    }

    public done(): boolean {
        return this.loaded >= 1;
    }

    public images_loaded(): boolean {
        return this.loaded_images_amount === this.images.length;
    }

    public audio_loaded(): boolean {
        return true;
    }

    public update_loading(delta: number) {
        if (this.loaded < this.loaded_images_amount / this.images.length) {
            this.loaded += delta * this.loading_graphic_speed;
        }
    }
}
