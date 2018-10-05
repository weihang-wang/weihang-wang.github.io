(function(Modernizr) {

  var app = window.LENOVO = (window.LENOVO || {});

  var self = app.COMPARETABLE = {
    win: $(window),
    wrapper: null,
    colCloneWrapper: $("<div class=\"compareTable-cloneWrapper\">"),
    // rowCloneWrapper: $("<div class=\"compareTable-headingClone-locked compareTable-headingClone-greatGrandparent\"><div class=\"compareTable-headingClone-grandparent\"><div class=\"compareTable-headingClone-parent\"></div></div></div>"),
    rowCloneWrapper: $("<div class=\"compareTable-headingClone-wrapper\"></div>"),
    scroller: null,
    table: null,
    mainHeadings: null,
    colClone: null,
    rowClone: null,
    resizeTO: null,

    shouldRun: function() {
      return !!$(".compareTable-table").length;
    },

    init: function() {
      // cache various elements
      this.wrapper = $(".compareTable");
      this.scroller = $(".compareTable-scrollable .compareTable-overflowContainer");
      this.table = $(".compareTable-table");
      this.mainHeadings = $(".compareTable-mainHeadings");

      self.setupFixedColumn();
      self.setupSectionAccordion();
      self.setupColumnToggle();
      self.setupTooltips();

      // This feature is being moved to M2
      // if (!$("#no-fixed-header").length) {
      //   self.setupFixedRow();
      // }
      self.setupResizeEvent();
      self.setupScrollEvent();

      if (!Modernizr.borderradius) {
        this.addFeatureImgFallback();
      }

    },

    setupFixedColumn: function() {
      self.colClone = self.table.clone();
      self.colClone
        .addClass("compareTable-clone")
        .appendTo(self.colCloneWrapper);

      self.colCloneWrapper.appendTo(self.wrapper);
      self.toggleColumnClone(); // see if we need it right now
    },

    setupFixedRow: function() {
      var offset;

      // wait for things to settle before doing the initial clone
      setTimeout(function() {

        // set up the cloned header row
        self.rowClone = self.table.clone();
        self.rowClone
          .find("tbody")
            .remove()
            .end()
          .find("thead")
            .not(":first")
              .remove()
              .end()
            .end()
          .addClass("compareTable-headingClone")
          .css("position", "relative")
          // .appendTo(self.rowCloneWrapper.find(".compareTable-headingClone-parent"));
          .appendTo(self.rowCloneWrapper);

        offset = self.table.offset();

        // set up the wrapper to be fixed and positioned correctly initially
        self.rowCloneWrapper.appendTo("body");

        // set up side scrolling match on cloned header
        self.scroller.on("scroll", function() {
          self.rowClone.css("left", (self.scroller.scrollLeft() * -1));
        });

        self.repositionHeaderClone();
        self.resizeHeaderClone();
        self.toggleHeaderClone(); // see if we need it right now

      }, 500);
    },

    toggleColumnClone: function() {
      if (this.colClone) {
        if (this.scroller.get(0).offsetWidth < (this.scroller.get(0).scrollWidth - 5)) {
          this.colClone.show();
        } else {
          this.colClone.hide();
        }
      }
    },

    toggleHeaderClone: function() {
      var scrollTop, tableTop;

      if (this.rowClone) {
        scrollTop = this.win.scrollTop();
        tableTop = this.mainHeadings.offset().top;

        if (scrollTop > tableTop && scrollTop < (tableTop + this.table.height() - this.rowClone.height())) {
          this.rowCloneWrapper.show();
        } else {
          this.rowCloneWrapper.hide();
        }
      }
    },

    resizeHeaderClone: function() {
      var headingRow = this.table.find(".compareTable-mainHeadings"),
          headings = headingRow.find("td, th");

      this.rowCloneWrapper
        .width(this.scroller.width() - headings.filter(".compareTable-addRemoveItems").width() - 2)
        .find("table")
          .width((headingRow.width() + 2) + "px")
          .end()
        // resize each cell, necessary since the row clone is not in the
        // original table's container
        .find(".compareTable-mainHeadings")
          .find("td, th")
            .each(function() {
              $(this).width(headings.filter(":eq(" + $(this).index() + ")").width());
            });
    },

    repositionHeaderClone: function() {
      if (this.rowCloneWrapper) {
        this.rowCloneWrapper.css("left", this.table.find(".compareTable-mainHeadings th:visible:first").offset().left);
      }
    },

    setupColumnToggle: function() {
      var container = this.table.find(".compareTable-addRemoveItems");

      container
        // toggle the selection checkboxes
        .find("button")
          .on("click", function() {
            container.toggleClass("is-expanded");
          })
          .end()

        // handle changes to the selections
        .on("change", ":checkbox", function() {
          self.handleColumnSelection(this);
        });

      // Add pass-through event on clone
      self.colClone.find(".compareTable-addRemoveItems button").click(function(e) {
        e.preventDefault();
        e.stopPropagation(); // no need to bubble the cloned event
        container.find("button").click();
      });
    },

    handleColumnSelection: function(checkbox) {
      var cells, colHeader, groupBrandCount, groupHeader,
          active = $(checkbox).is(":checked"),
          headerRow = this.table.find(".compareTable-mainHeadings"),
          val = checkbox.value;

      colHeader = headerRow.find(".compareTable-heading[data-productid='" + val + "']");

      if (colHeader && colHeader.length) {
        // determine all cells to be hidden
        cells = this.table
          .find("tbody tr")
          // can't be in one find() because it would only find the first <td>
          .find("td:eq(" + colHeader.index() + ")")
          // add in our header cell (and clone)
          .add(colHeader);
        if (this.rowClone) {
          cells = cells.add(this.rowClone.find(".compareTable-mainHeadings > *:eq(" + colHeader.index() + ")"));
        }

        // toggle the data cells (and headers)
        if (active) {
          cells.show();
        } else {
          cells.hide();
        }

        // set correct colspan on section headers...
        this.table
          .find(".expandableHeading")
            .prop("colspan", headerRow.find(".compareTable-heading:visible").length + 1);

        // ... and on the brand group header
        groupBrandCount = headerRow.find(".compareTable-heading[data-brandgroup='" + colHeader.data("brandgroup") + "']:visible").length;
        groupHeader = this.table.find(".compareTable-brandRow > *:contains('" + colHeader.data("brandgroup") + "')");
        if (groupBrandCount) {
          groupHeader.prop("colspan", groupBrandCount).show();
        } else {
          // none left in the group, hide it.
          groupHeader.hide();
        }

        // see if we still need the column clone
        this.toggleColumnClone();
        this.repositionHeaderClone();
        this.resizeHeaderClone();
      }
    },

    setupTooltips: function() {
      self.table
        .on("click", ".compareTable-rowHeading .has-additionalInfoOverlay", function(e) {
          var $header = $(this).parent();

          e.preventDefault();
          e.stopPropagation(); // don't let the body handler get this! (it hides the tooltip)

          // remove overlay from any other header cell in this table
          $(e.delegateTarget)
            .find(".compareTable-rowHeading")
              .not($header)
                .removeClass("show-overlay sticky-overlay");
          // toggle overlay class to this element
          if ($header.hasClass("sticky-overlay")) {
            $header.removeClass("show-overlay sticky-overlay");
          } else {
            $header.addClass("show-overlay sticky-overlay");
          }
        })
        .on("mouseenter", ".compareTable-rowHeading .has-additionalInfoOverlay", function(e) {
          var $header = $(this).parent();

          // don't show tooltips if a "sticky" one is showing
          if (!$(e.delegateTarget).find(".sticky-overlay").length) {
            $header.addClass("show-overlay");
          }
        })
        .on("mouseleave", ".compareTable-rowHeading .has-additionalInfoOverlay", function(e) {
          var $header = $(this).parent();

          if (!$header.hasClass("sticky-overlay")) {
            $header.removeClass("show-overlay sticky-overlay");
          }
        });

      // pass events through from the cloned table to the original
      self.colClone
        .on("click mouseenter mouseleave", ".compareTable-rowHeading .has-additionalInfoOverlay", function(e) {
          self.passThroughClonedEvent(e);
        });

      // remove overlay class when body is clicked anywhere else
      $("body").on("click", function() {
        self.table
          .find(".compareTable-rowHeading")
            .removeClass("show-overlay sticky-overlay");
      });
    },

    passThroughClonedEvent: function(event) {
      // since we're passing events through to the original table, stop them here
      event.preventDefault();
      event.stopPropagation();

      this.table
        .find(".has-additionalInfoOverlay:contains(" + $(event.target).text() + ")")
          .trigger(event.type);
    },

    setupResizeEvent: function() {
      // any time the window changes we need to determine if we need the clone(s)
      $(window).resize(function() {
        // throttle resize calls
        if (self.resizeTO) { clearTimeout(self.resizeTO); }

        // wait for elements to finish moving before seeing if we need the fixed headers
        self.resizeTO = setTimeout(function() {
          self.resizeTO = null;
          self.toggleColumnClone();
          self.toggleHeaderClone();
          self.repositionHeaderClone();
          self.resizeHeaderClone();
        }, 500);
      });
    },

    setupScrollEvent: function() {
      // any time the window scrolls we need to determine if we need the header clone
      $(window).on("scroll", function() {
        self.toggleHeaderClone();
      });
    },

    setupSectionAccordion: function() {
      self.wrapper.on("click", ".expandableHeading", function(e) {
        e.preventDefault();

        self.wrapper
          .find("." + $(this).data("section"))
            .toggle();
        // we need to flip the cloned section header class so it shows the correct icon
        self.colClone
          .find("[data-section='" + $(this).data("section") + "']")
            .toggleClass("expandableHeading-is-expanded");

        // showing and hiding these can affect the width of columns,
        // so we need to resize the cloned header row
        self.repositionHeaderClone();
        self.resizeHeaderClone();
      });

      // close all sections by default (they are open in the raw html)
      self.table.find(".expandableHeading").click();
    },

    addFeatureImgFallback: function() {
      $(".compareTable-standard")
        .append("<span class=\"compareTable-fallbackIcon\"><img src=\"/images/ie-icon-standard.png\" alt=\"\"></span>");
      $(".compareTable-select")
        .append("<span class=\"compareTable-fallbackIcon\"><img src=\"/images/ie-icon-select.png\" alt=\"\"></span>");
    }

  };
})(Modernizr);
