var ResourceLoader = (function () {
    function ResourceLoader() {
        this.loaded = 0;
        this.images = [];
        this.image_map = {};
        this.loaded_images_amount = 0;
        this.loading_graphic_speed = 1;
    }
    ResourceLoader.prototype.get_image = function (name) {
        return this.image_map[name];
    };
    ResourceLoader.prototype.load_images = function (urls) {
        var ids = [];
        for (var i = 0; i < urls.length; i++) {
            ids.push(this.load_image(urls[i]));
        }
        return ids;
    };
    ResourceLoader.prototype.load_image = function (url) {
        var _this = this;
        var id = this.images.length;
        var image = new Image();
        image.src = url[1];
        image.onload = function () {
            _this.loaded_images_amount++;
        };
        this.images.push(image);
        this.image_map[url[0]] = image;
        return id;
    };
    ResourceLoader.prototype.done = function () {
        return this.loaded >= 1;
    };
    ResourceLoader.prototype.images_loaded = function () {
        return this.loaded_images_amount === this.images.length;
    };
    ResourceLoader.prototype.audio_loaded = function () {
        return true;
    };
    ResourceLoader.prototype.update_loading = function (delta) {
        if (this.loaded < this.loaded_images_amount / this.images.length) {
            this.loaded += delta * this.loading_graphic_speed;
        }
    };
    return ResourceLoader;
}());
