import $ from 'jquery';

let dataTableInstance = null;

const dtconfig = () => {
    dataTableInstance = $('#example').DataTable({
        pageLength: 10,
        retrieve: true,
        ordering: false
    });
};

export const redrawDataTable = () => {
    if (dataTableInstance) {
        dataTableInstance.draw();
    }
};

export default dtconfig;
