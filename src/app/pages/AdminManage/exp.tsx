/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import { Button, H5, HotkeysTarget2, KeyCombo, MenuItem, Position, Switch, Toaster } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";

import { areFilmsEqual, createFilm, filmSelectProps, IFilm, renderCreateFilmOption } from "./films";

const FilmOmnibar = Omnibar.ofType<IFilm>();

export interface IOmnibarExampleState {
    allowCreate: boolean;
    isOpen: boolean;
    resetOnSelect: boolean;
}

export class OmnibarExample extends React.Component<{}, IOmnibarExampleState> {
    public state: IOmnibarExampleState = {
        allowCreate: false,
        isOpen: true,
        resetOnSelect: true,
    };


    public render() {
        const { allowCreate } = this.state;

        const maybeCreateNewItemFromQuery = allowCreate ? createFilm : undefined;
        const maybeCreateNewItemRenderer = allowCreate ? renderCreateFilmOption : null;

        return (
            <HotkeysTarget2
                hotkeys={[
                    {
                        combo: "shift + o",
                        global: true,
                        label: "Show Omnibar",
                        onKeyDown: this.handleToggle,
                        // prevent typing "O" in omnibar input
                        preventDefault: true,
                    },
                ]}
            >
                <FilmOmnibar
                    {...filmSelectProps}
                    {...this.state}
                    createNewItemFromQuery={maybeCreateNewItemFromQuery}
                    // createNewItemRenderer={maybeCreateNewItemRenderer}
                    itemsEqual={areFilmsEqual}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={this.handleItemSelect}
                    onClose={this.handleClose}
                />
            </HotkeysTarget2>
        );
    }

    private handleClick = (_event: React.MouseEvent<HTMLElement>) => {
        this.setState({ isOpen: true });
    };

    private handleItemSelect = (film: IFilm) => {
        this.setState({ isOpen: false });

        console.log("You selected "  + film.title);
    };

    private handleClose = () => this.setState({ isOpen: false });
    private handleToggle = () => this.setState({ isOpen: !this.state.isOpen });
}
