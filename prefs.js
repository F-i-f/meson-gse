const Lang = imports.lang;
const Gio = imports.gi.Gio;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const Gettext = imports.gettext.domain(Me.metadata['gettext-domain']);
const _ = Gettext.gettext;


function init() {
    Convenience.initTranslations();
}

const TransparentWindowMovingSettings = GObject.registerClass(
class TransparentWindowMovingSettings extends Gtk.Grid {
    _init(params) {
        super._init(params);

        this.margin = 24;
        this.row_spacing = 6;
        this.column_spacing = 6;
        this.orientation = Gtk.Orientation.VERTICAL;

        this._settings = Convenience.getSettings();

        let ypos = 1;

        this.enabled_label = new Gtk.Label({label: _("Use backlight control:"), halign: Gtk.Align.START});
        this.enabled_control = new Gtk.Switch();
        this.attach(this.enabled_label, 1, ypos, 1, 1);
        this.attach(this.enabled_control, 2, ypos, 1, 1);
        this._settings.bind('use-backlight', this.enabled_control, 'active', Gio.SettingsBindFlags.DEFAULT);

        ypos += 1;

        this.monitors_label = new Gtk.Label({label: _("Monitor(s):"), halign: Gtk.Align.START});
        this.monitors_control = new Gtk.ComboBoxText({halign: Gtk.Align.END});
        this.monitors_control.append_text(_("All"));
        this.monitors_control.append_text(_("Built-in"));
        this.monitors_control.append_text(_("External"));
        this.monitors_control.set_active(this._settings.get_enum('monitors'));
        this.monitors_control.connect('changed', Lang.bind(this, function() {
            this._settings.set_enum('monitors', this.monitors_control.get_active());
        }));
        this.attach(this.monitors_label, 1, ypos, 1, 1);
        this.attach(this.monitors_control, 2, ypos, 1, 1);

        ypos += 1;

        this.min_brightness_label = new Gtk.Label({label: _("Minimum brightness (0..1):"), halign: Gtk.Align.START});
        this.min_brightness_control = new Gtk.SpinButton({
            digits: 2,
            adjustment: new Gtk.Adjustment({
                lower: 0.0,
                upper: 1.0,
                step_increment: 0.01
            })
        });
        this.attach(this.min_brightness_label, 1, ypos, 1, 1);
        this.attach(this.min_brightness_control, 2, ypos, 1, 1);
        this._settings.bind('min-brightness', this.min_brightness_control, 'value', Gio.SettingsBindFlags.DEFAULT);

        ypos += 1;

        this.debug_label = new Gtk.Label({label: _("Debug:"), halign: Gtk.Align.START});
        this.debug_control = new Gtk.Switch();
        this.attach(this.debug_label, 1, ypos, 1, 1);
        this.attach(this.debug_control, 2, ypos, 1, 1);
        this._settings.bind('debug', this.debug_control, 'active', Gio.SettingsBindFlags.DEFAULT);
}
});

function buildPrefsWidget() {
    let widget = new TransparentWindowMovingSettings();
    widget.show_all();

    return widget;
}