import $ from 'jquery';

const dtconfig = () => {
    $('#example').DataTable({
        pageLength: 10,
        retrieve: true,
    });
}

export default dtconfig