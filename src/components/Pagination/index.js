import React from "react";

import "./Pagination.css";

class Pagination extends React.Component {
    prepareItems() {
        const data = this.props.data;

        if (data.items == null) {
            return [];
        }

        const itemsPerPage = data.itemsPerPage;
        const page = data.page;
        const total = data.items.dataCount;

        const pages = Math.ceil(total / itemsPerPage);

        let items = [];

        // head
        if (page === 1) {
            items.push({
                isClickable: false,
                isSelected: false,
                label: "&lsaquo;",
                page: 1
            });
            items.push({
                isClickable: false,
                isSelected: true,
                label: "1",
                page: 1
            });
        } else {
            items.push({
                isClickable: true,
                isSelected: false,
                label: "&lsaquo;",
                page: page - 1
            });

            items.push({
                isClickable: true,
                isSelected: false,
                label: "1",
                page: 1
            });

            if (page - 2 > 1) {
                items.push({
                    isClickable: false,
                    isSelected: false,
                    label: "...",
                    page: null
                });
            }
        }
        // middle
        var offsetStart = page - 2;
        if (offsetStart <= 1) {
            offsetStart = 2;
        }
        var offsetEnd = page + 2;
        if (offsetEnd >= pages) {
            offsetEnd = pages - 1;
        }
        for (var i = offsetStart; i <= offsetEnd; i++) {
            if (i === page) {
                items.push({
                    isClickable: false,
                    isSelected: true,
                    label: i,
                    page: i
                });
            } else {
                items.push({
                    isClickable: true,
                    isSelected: false,
                    label: i,
                    page: i
                });
            }
        }
        // tail
        if (page === pages) {
            items.push({
                isClickable: false,
                isSelected: true,
                label: pages,
                page: pages
            });
            items.push({
                isClickable: false,
                isSelected: false,
                label: "&rsaquo;",
                page: pages
            });
        } else {
            if (page + 2 < pages) {
                items.push({
                    isClickable: false,
                    isSelected: false,
                    label: "...",
                    page: null
                });
                items.push({
                    isClickable: true,
                    isSelected: false,
                    label: pages,
                    page: pages
                });
            } else {
                items.push({
                    isClickable: true,
                    isSelected: false,
                    label: pages,
                    page: pages
                });
            }

            items.push({
                isClickable: true,
                isSelected: false,
                label: "&rsaquo;",
                page: page + 1
            });
        }

        return items;
    }

    render() {
        const items = this.prepareItems();

        return (
            <div className="Pagination">
                {items.map((item, idx) => {
                    function createMarkup(label) {
                        return { __html: label };
                    }

                    let className = ["Pagination-item"];
                    if (item.isClickable === true) {
                        className.push("Pagination-item-isClickable");
                    }
                    if (item.isSelected === true) {
                        className.push("Pagination-item-isSelected");
                    }

                    if (item.isClickable === true) {
                        return (
                            <span
                                className={className.join(" ")}
                                dangerouslySetInnerHTML={createMarkup(
                                    item.label
                                )}
                                onClick={() => this.props.handleGoTo(item.page)}
                                key={idx}
                            ></span>
                        );
                    }

                    return (
                        <span
                            className={className.join(" ")}
                            dangerouslySetInnerHTML={createMarkup(item.label)}
                            key={idx}
                        ></span>
                    );
                })}
            </div>
        );
    }
}

export default Pagination;
