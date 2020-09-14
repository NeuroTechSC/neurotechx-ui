export default function() {
  return [
    {
      title: "Display",
      to: "/Display",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Data",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/Tables",
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    }
  ];
}
