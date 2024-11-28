import $ from 'jquery';

const dtconfig = () => {
    $('#example').DataTable({
        pageLength: 10,
        retrieve: true,
        ordering: false,
    });
};

export default dtconfig;
