export class SelectOptionsUtils {
    static changeOptionTextColor() {
        document.querySelectorAll('.form-select').forEach(select => {
            if (select.value === "") {
                select.style.color = '#6C757D';
            } else {
                select.style.color = '#212529';
            }
        });
    }
}
