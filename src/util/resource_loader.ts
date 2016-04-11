class ResourceLoader {
    public loaded = 0;

    private image_map = {};
    private total_images_amount = 0;
    private loaded_images_amount = 0;
    private loading_graphic_speed = 1;

    public get_image(name: string) {
        let image = this.image_map[name];
        if (image === undefined) {
            console.log("Couldn't find image with name " + name + "!");
        }
        return image;
    }

    public get_image_dimensions(name: string): [number, number] {
        let image = this.get_image(name);
        return [image.width, image.height];
    }

    public load_images(urls: [string, string][]): number[] {
        let ids = [];
        for (let i = 0; i < urls.length; i++) {
            ids.push(this.load_image(urls[i]));
        }
        return ids;
    }

    public load_image(url: [string, string]): number {
        let id = this.total_images_amount;
        let image = new Image();
        image.src = url[1];
        image.onload = () => {
            this.loaded_images_amount++;
        };
        this.total_images_amount++;
        this.image_map[url[0]] = image;
        return id;
    }

    public done(): boolean {
        return this.loaded >= 1;
    }

    public images_loaded(): boolean {
        return this.loaded_images_amount === this.total_images_amount;
    }

    public audio_loaded(): boolean {
        return true;
    }

    public update_loading(delta: number) {
        if (this.loaded < this.loaded_images_amount / this.total_images_amount) {
            this.loaded += delta * this.loading_graphic_speed;
        }
    }
}
