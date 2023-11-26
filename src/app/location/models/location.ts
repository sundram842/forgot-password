import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/global/utils/adapter';

export class Location {
    id?: number;
    slug?: string;
    displayName?: string;
    streetName?: string;
    streetNumber?: number;
    city?: string;
    stateCode?: string;
    state?: string;
    postalCode?: string;
    countryCode?: string;
    country?: string;
    private selected: boolean = false;

    public get isSelected(): boolean {
        return this.selected;
    }

    public setIsSelected(status: boolean) {
        this.selected = status;
    }
}

@Injectable({
    providedIn: 'root',
})

export class LocationAdapter implements Adapter<Location> {
    adapt(data: any) {
        const location = new Location();
        try {
            location.id = data?.id;
            location.slug = data?.slug;
            location.displayName = data?.displayName;
            location.streetName = data?.streetName;
            location.streetNumber = data?.streetNumber;
            location.state = data?.state;
            location.postalCode = data?.postalCode;
            location.countryCode = data?.countryCode;
            location.country = data?.country;

        } catch (e) {
            console.log(e);
        }
        return location;
    }

}
