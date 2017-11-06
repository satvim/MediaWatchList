/**
 * Created by Sathish on 15/10/17.
 */
import { Component } from '@angular/core';
import { MediaItemService } from "./media-item.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'mw-media-item-list',
    templateUrl: 'app/media-item-list.component.html',
    styleUrls: ['app/media-item-list.component.css']
})

export class MediaItemListComponent {
    mediaItems = [];
    medium = '';
    paramsSubscription;

    constructor(private mediaItemService: MediaItemService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.paramsSubscription = this.activatedRoute.params
            .subscribe(params => {
                let medium = params['medium'];
                if (medium == 'all') {
                    medium = '';
                }
                this.getMediaItems(medium);
            });
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe;
    }

    getMediaItems(medium) {
        this.medium = medium;
        this.mediaItemService.get(medium)
            .subscribe(mediaItems => {
            this.mediaItems = mediaItems;
        });
    }
    onMediaItemDelete(mediaItem) {
        this.mediaItemService.delete(mediaItem)
            .subscribe(() => {
            this.getMediaItems(this.medium);
        });
    }
}